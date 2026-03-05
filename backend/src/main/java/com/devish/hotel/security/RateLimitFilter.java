package com.devish.hotel.security;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@Component
public class RateLimitFilter implements Filter {

    private static final int MAX_REQUESTS = 100;
    private static final long WINDOW_SIZE_MILLIS = TimeUnit.MINUTES.toMillis(1);
    private final ConcurrentHashMap<String, RateLimitBucket> buckets = new ConcurrentHashMap<>();

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Initialization logic if needed
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        
        String clientIp = getClientIP(httpRequest);
        
        RateLimitBucket bucket = buckets.computeIfAbsent(clientIp, k -> new RateLimitBucket());
        
        if (bucket.isAllowed()) {
            chain.doFilter(request, response);
        } else {
            httpResponse.setStatus(429); // Too Many Requests
            httpResponse.getWriter().write("Rate limit exceeded. Please try again later.");
        }
    }

    @Override
    public void destroy() {
        // Cleanup logic if needed
    }

    private String getClientIP(HttpServletRequest request) {
        String clientIP = request.getHeader("X-Forwarded-For");
        if (clientIP == null || clientIP.isEmpty()) {
            clientIP = request.getRemoteAddr();
        } else {
            clientIP = clientIP.split(",")[0].trim();
        }
        return clientIP;
    }

    private static class RateLimitBucket {
        private long windowStartTime;
        private int requestCount;

        RateLimitBucket() {
            this.windowStartTime = System.currentTimeMillis();
            this.requestCount = 0;
        }

        boolean isAllowed() {
            long currentTime = System.currentTimeMillis();
            
            // Reset window if expired
            if (currentTime - windowStartTime > WINDOW_SIZE_MILLIS) {
                windowStartTime = currentTime;
                requestCount = 0;
            }
            
            if (requestCount < MAX_REQUESTS) {
                requestCount++;
                return true;
            }
            return false;
        }
    }
}

import { RateLimiterMemory } from 'rate-limiter-flexible';

export let rateLimiter: null | RateLimiterMemory = null;

const DURATION = 60; // seconds
const MAX_REQUESTS = 10; // max requests per duration

export const initRateLimiter = () => {
    rateLimiter = new RateLimiterMemory({
        points: MAX_REQUESTS, // 10 requests
        duration: DURATION // per 1 minute by IP
    });
};

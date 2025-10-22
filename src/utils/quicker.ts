import { totalmem, loadavg, freemem } from 'os';
import config from '../configs/config';

export default {
    getSystemHealth: () => {
        return {
            cpuUsage: loadavg(),
            totalMemory: `${(totalmem() / 1024 / 1024).toFixed(2)} MB`,
            freeMemory: `${(freemem() / 1024 / 1024).toFixed(2)} MB`
        };
    },
    getApplicationHealth: () => {
        return {
            environment: config.ENV,
            uptime: `${process.uptime().toFixed(2)} Seconds`,
            memoryUsage: {
                heapTotal: `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
                heapUsed: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
            }
        };
    }
};

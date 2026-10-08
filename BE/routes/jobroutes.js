import { Router } from "express";
import fetch from "node-fetch"; // Install with: npm install node-fetch

const router = Router();

const handleJobsFetch = async (req, res) => {
    try {
        const { job_title, location } = req.body || {};
        const queryParams = new URLSearchParams();
        if (job_title) queryParams.append("job_title", job_title);
        if (location) queryParams.append("location", location);
        
        const targetUrl = `https://skillassessmentapi.onrender.com/jobs${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
        
        const response = await fetch(targetUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req.body),
        });

        if (!response.ok) {
            throw new Error(`FastAPI request failed: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ error: "Failed to fetch jobs" });
    }
};

router.post("/", handleJobsFetch);
router.post("/job", handleJobsFetch);

export default router;

import React from "react";
import Skeleton from "@mui/material/Skeleton";
import "./Slider.css";

const SliderSkeleton: React.FC = () => {
  return (
    <div className="slider">
      <div className="slider-container">
        <div className="slide">
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="pulse"
            sx={{
              bgcolor: "#e0e0e0",
              "&::after": {
                background:
                  "linear-gradient(90deg, transparent, #f5f5f5, transparent)",
              },
            }}
          />
          <div className="slide-content">
            <Skeleton
              variant="text"
              width="60%"
              height={40}
              animation="pulse"
              sx={{
                bgcolor: "#e0e0e0",
                mb: 1,
                "&::after": {
                  background:
                    "linear-gradient(90deg, transparent, #f5f5f5, transparent)",
                },
              }}
            />
            <Skeleton
              variant="text"
              width="80%"
              height={20}
              animation="pulse"
              sx={{
                bgcolor: "#e0e0e0",
                mb: 2,
                "&::after": {
                  background:
                    "linear-gradient(90deg, transparent, #f5f5f5, transparent)",
                },
              }}
            />
            <Skeleton
              variant="rounded"
              width={180}
              height={40}
              animation="pulse"
              sx={{
                bgcolor: "#e0e0e0",
                "&::after": {
                  background:
                    "linear-gradient(90deg, transparent, #f5f5f5, transparent)",
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="slider-dots">
        {[...Array(3)].map((_, index) => (
          <Skeleton
            key={index}
            variant="circular"
            width={8}
            height={8}
            animation="pulse"
            sx={{
              bgcolor: "#e0e0e0",
              mx: 0.5,
              "&::after": {
                background:
                  "linear-gradient(90deg, transparent, #f5f5f5, transparent)",
              },
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SliderSkeleton;

// src/assets/imageMap.ts
import job1 from "./job1.png";
import job2 from "./job2.png";
import job3 from "./job3.png"; // Add more images as needed

import { StaticImageData } from "next/image";

const imageMap: { [key: string]: StaticImageData } = {
  "job1.png": job1,
  "job2.png": job2,
  "job3.png": job3,
  // Map more images here
};

export default imageMap;

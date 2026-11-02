"use client";
import React, { useEffect } from "react";
import { useGlobalState } from "./GlobalStateContext";
import config from "@/config";

const fetchCMS = ({ collection }) => {
  // Public content is proxied by our server. Never ship a CMS bearer token to the browser.
  return fetch(`/api/public-cms?collection=${encodeURIComponent(collection)}`)
    .then(async (response) => {
      if (!response.ok) throw new Error(`CMS request failed (${response.status})`);
      return response.json();
    });
};

const ContentLoader = () => {
  const {
    setIsLoading,
    setWhyContent,
    setCtaBannerContent,
    setHeroContent,
    setMarqueeContent,
  } = useGlobalState();

  useEffect(() => {
    setIsLoading(true);

    // Define all fetch operations in an array
    const fetchOperations = [
      fetchCMS({ collection: "why-content" }).then(
        (data) => data.data[0].attributes
      ),
      fetchCMS({ collection: "cta-banner" }).then(
        (data) => data.data[0].attributes
      ),
      fetchCMS({ collection: "hero-content" }).then(
        (data) => data.data[0].attributes
      ),
      fetchCMS({ collection: "marquee" }).then(
        (data) => data.data[0].attributes
      ),
    ];

    Promise.all(fetchOperations)
      .then(([whyContent, ctaBannerContent, heroContent, marqueeContent]) => {
        setWhyContent(whyContent);
        setCtaBannerContent(ctaBannerContent);
        setHeroContent(heroContent);
        setMarqueeContent(marqueeContent);
      })
      .catch((error) => {
        console.error("Error fetching content:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []); // Empty dependency array to run once on mount

  return null; // This component doesn't render anything itself
};

export default ContentLoader;

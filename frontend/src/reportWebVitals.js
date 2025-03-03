const reportWebVitals = (onePerfEntry) => {
  if (onePerfEntry && onePerfEntry instanceof Function) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB}) => {
      getCLS(onePerfEntry);
      getFID(onePerfEntry);
      getFCP(onePerfEntry);
      getLCP(onePerfEntry);
      getTTFB(onePerfEntry);
    });
  }
};

  export default reportWebVitals;
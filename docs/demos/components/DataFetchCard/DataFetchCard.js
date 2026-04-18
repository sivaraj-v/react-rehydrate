import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const MOCK_PRODUCTS = {
  "product-1": {
    name: "Analytics Dashboard",
    status: "Active",
    description: "Real-time metrics for your platform.",
    updatedAt: "2 minutes ago"
  },
  "product-2": {
    name: "Report Builder",
    status: "Draft",
    description: "Schedule and export custom reports.",
    updatedAt: "1 hour ago"
  },
  "product-3": {
    name: "Audit Log",
    status: "Active",
    description: "Full event history with filters and exports.",
    updatedAt: "Just now"
  }
};

const fetchProductData = productId =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(
        MOCK_PRODUCTS[productId] || {
          name: "Unknown product",
          status: "N/A",
          description: "No data available.",
          updatedAt: "N/A"
        }
      );
    }, 1200);
  });

const DataFetchCard = ({ productId, fallbackTitle }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchProductData(productId).then(result => {
      if (!cancelled) {
        setData(result);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [productId]);

  return (
    <div
      className="DataFetchCard"
      data-rehydratable="DataFetchCard"
      data-product-id={productId}
      data-fallback-title={fallbackTitle}
    >
      {loading ? (
        <>
          <p className="DataFetchCard-status">Loading live data...</p>
          <h2>{fallbackTitle}</h2>
          <p>Fetching details from server.</p>
        </>
      ) : (
        <>
          <p className="DataFetchCard-status DataFetchCard-status--live">
            Live data loaded
          </p>
          <h2>{data.name}</h2>
          <p>{data.description}</p>
          <p>
            Status: <strong>{data.status}</strong> &mdash; Updated:{" "}
            {data.updatedAt}
          </p>
        </>
      )}
    </div>
  );
};

DataFetchCard.propTypes = {
  fallbackTitle: PropTypes.string.isRequired,
  productId: PropTypes.string.isRequired
};

export default DataFetchCard;

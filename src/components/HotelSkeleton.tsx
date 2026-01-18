import React from "react"

export const HotelSkeleton: React.FC = () => {
  return (
    <div className="skeleton hotel-card">
      <div className="skeleton-image" />
      <div className="skeleton-content">
        <div className="skeleton-line title" />
        <div className="skeleton-line short" />
        <div className="skeleton-line" />
        <div className="skeleton-line short" />
      </div>
    </div>
  )
}

export const SkeletonLoader: React.FC<{ count?: number }> = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <HotelSkeleton key={i} />
      ))}
    </>
  )
}

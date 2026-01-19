import React from "react"
import { ChangeEvent } from "react"
import "../styles/SearchBar.css"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export const SearchBar = ({
  value,
  onChange,
  placeholder = "Search hotels or cities...",
}: SearchBarProps) => {
  return (
    <div className="search-input-wrapper">
      <input
        className="search-input"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
      />
    </div>
  )
}

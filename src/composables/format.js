import { watchEffect } from "vue"

export function useImageUrl(path) {
  return new URL(`../assets/images/${path}`, import.meta.url).href
}

export function useDate(dateNum) {
  return new Date(dateNum * 1000).toISOString().split('T')[0]
}

const options = {
  year: "numeric",
  month: "short",
  day: "2-digit"
}

export function useLocalDate(dateNum) {
  const date =  new Date(dateNum * 1000).toLocaleDateString("en-US", options)
  return {
    fullDate: date, // Feb 02, 2021
    year: date.slice(-5),
    month: date.slice(0, 3),
    day: date.slice(4, 6),
  };
}
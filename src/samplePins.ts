import type { ImageResult } from "./types";

// TEMPORARY: five search results to try out the look of the pinned area.
// Delete this file once real pinning works.
//
// All from Unsplash on purpose: Unsplash image addresses keep working, while
// Pixabay's stop working after 24 hours.
export const SAMPLE_PINS: ImageResult[] = [
  {
    id: "unsplash-V7SKRhXskv8",
    title: "white gold fish",
    thumbnail:
      "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDk4NDMwfDB8MXxzZWFyY2h8MXx8ZmlzaHxlbnwwfHx8fDE3OTQ3NjI4NTl8MA&ixlib=rb-4.1.0&q=80&w=400",
    url: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDk4NDMwfDB8MXxzZWFyY2h8MXx8ZmlzaHxlbnwwfHx8fDE3OTQ3NjI4NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    creator: "zhengtao tang",
    source: "Unsplash",
    page_url: "https://unsplash.com/photos/white-gold-fish-V7SKRhXskv8",
  },
  {
    id: "unsplash-nCz_ZgnbtaE",
    title: "two Siamese fighting fishes",
    thumbnail:
      "https://images.unsplash.com/photo-1578507065211-1c4e99a5fd24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDk4NDMwfDB8MXxzZWFyY2h8Mnx8ZmlzaHxlbnwwfHx8fDE3OTQ3NjI4NTl8MA&ixlib=rb-4.1.0&q=80&w=400",
    url: "https://images.unsplash.com/photo-1578507065211-1c4e99a5fd24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDk4NDMwfDB8MXxzZWFyY2h8Mnx8ZmlzaHxlbnwwfHx8fDE3OTQ3NjI4NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    creator: "Worachat Sodsri",
    source: "Unsplash",
    page_url:
      "https://unsplash.com/photos/two-siamese-fighting-fishes-nCz_ZgnbtaE",
  },
  {
    id: "unsplash-ayOUamNaPpw",
    title: "Three red and white goldfish swimming in deep blue water",
    thumbnail:
      "https://images.unsplash.com/photo-1788195188809-92bec4db841b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDk4NDMwfDB8MXxzZWFyY2h8M3x8ZmlzaHxlbnwwfHx8fDE3OTQ3NjI4NTl8MA&ixlib=rb-4.1.0&q=80&w=400",
    url: "https://images.unsplash.com/photo-1788195188809-92bec4db841b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDk4NDMwfDB8MXxzZWFyY2h8M3x8ZmlzaHxlbnwwfHx8fDE3OTQ3NjI4NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    creator: "Sou Jest",
    source: "Unsplash",
    page_url:
      "https://unsplash.com/photos/red-and-white-goldfish-swimming-ayOUamNaPpw",
  },
  {
    id: "unsplash-rEM3cK8F1pk",
    title: "clown fish in shallow focus photography",
    thumbnail:
      "https://images.unsplash.com/photo-1535591273668-578e31182c4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDk4NDMwfDB8MXxzZWFyY2h8NHx8ZmlzaHxlbnwwfHx8fDE3OTQ3NjI4NTl8MA&ixlib=rb-4.1.0&q=80&w=400",
    url: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDk4NDMwfDB8MXxzZWFyY2h8NHx8ZmlzaHxlbnwwfHx8fDE3OTQ3NjI4NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    creator: "Rachel Hisko",
    source: "Unsplash",
    page_url:
      "https://unsplash.com/photos/clown-fish-in-shallow-focus-photography-rEM3cK8F1pk",
  },
  {
    id: "unsplash-zJD6UVVW_Ck",
    title: "Four colorful koi fish swim in dark water",
    thumbnail:
      "https://images.unsplash.com/photo-1762036997158-50fa6e41ecbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDk4NDMwfDB8MXxzZWFyY2h8Nnx8ZmlzaHxlbnwwfHx8fDE3OTQ3NjI4NTl8MA&ixlib=rb-4.1.0&q=80&w=400",
    url: "https://images.unsplash.com/photo-1762036997158-50fa6e41ecbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDk4NDMwfDB8MXxzZWFyY2h8Nnx8ZmlzaHxlbnwwfHx8fDE3OTQ3NjI4NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    creator: "Nellie Adamyan",
    source: "Unsplash",
    page_url:
      "https://unsplash.com/photos/four-colorful-koi-fish-swim-in-dark-water-zJD6UVVW_Ck",
  },
];

import type { ImageResult } from "./types";

// TEMPORARY: ten search results to try out the look of the pinned area.
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
  {
    id: "unsplash-YV593oyMKmo",
    title: "silver fishes underwater",
    thumbnail:
      "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDk4NDMwfDB8MXxzZWFyY2h8NXx8ZmlzaHxlbnwwfHx8fDE3OTQ3NjI4NTl8MA&ixlib=rb-4.1.0&q=80&w=400",
    url: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDk4NDMwfDB8MXxzZWFyY2h8NXx8ZmlzaHxlbnwwfHx8fDE3OTQ3NjI4NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    creator: "Sebastian Pena Lambarri",
    source: "Unsplash",
    page_url: "https://unsplash.com/photos/silver-fishes-underwater-YV593oyMKmo",
  },
  {
    id: "unsplash-L-2p8fapOA8",
    title: "brown turtle swimming underwater",
    thumbnail:
      "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDk4NDMwfDB8MXxzZWFyY2h8N3x8ZmlzaHxlbnwwfHx8fDE3OTQ3NjI4NTl8MA&ixlib=rb-4.1.0&q=80&w=400",
    url: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDk4NDMwfDB8MXxzZWFyY2h8N3x8ZmlzaHxlbnwwfHx8fDE3OTQ3NjI4NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    creator: "Wexor Tmg",
    source: "Unsplash",
    page_url:
      "https://unsplash.com/photos/brown-turtle-swimming-underwater-L-2p8fapOA8",
  },
  {
    id: "unsplash-RAifY0OJe4w",
    title: "red Siamese fighting fish",
    thumbnail:
      "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDk4NDMwfDB8MXxzZWFyY2h8OHx8ZmlzaHxlbnwwfHx8fDE3OTQ3NjI4NTl8MA&ixlib=rb-4.1.0&q=80&w=400",
    url: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDk4NDMwfDB8MXxzZWFyY2h8OHx8ZmlzaHxlbnwwfHx8fDE3OTQ3NjI4NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    creator: "Kyaw Tun",
    source: "Unsplash",
    page_url: "https://unsplash.com/photos/red-siamese-fighting-fish-RAifY0OJe4w",
  },
  {
    id: "unsplash-KhX9wde5Xbo",
    title: "A puffin holds several small fish in its orange beak",
    thumbnail:
      "https://images.unsplash.com/photo-1781348424213-468c60e1c76a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDk4NDMwfDB8MXxzZWFyY2h8OXx8ZmlzaHxlbnwwfHx8fDE3OTQ3NjI4NTl8MA&ixlib=rb-4.1.0&q=80&w=400",
    url: "https://images.unsplash.com/photo-1781348424213-468c60e1c76a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDk4NDMwfDB8MXxzZWFyY2h8OXx8ZmlzaHxlbnwwfHx8fDE3OTQ3NjI4NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    creator: "Doncoombez",
    source: "Unsplash",
    page_url:
      "https://unsplash.com/photos/a-puffin-holds-several-small-fish-in-its-orange-beak-KhX9wde5Xbo",
  },
  {
    id: "unsplash-ekthrVC_DVs",
    title: "close up photography of red fish",
    thumbnail:
      "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDk4NDMwfDB8MXxzZWFyY2h8MTB8fGZpc2h8ZW58MHx8fHwxNzk0NzYyODU5fDA&ixlib=rb-4.1.0&q=80&w=400",
    url: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDk4NDMwfDB8MXxzZWFyY2h8MTB8fGZpc2h8ZW58MHx8fHwxNzk0NzYyODU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    creator: "David Clode",
    source: "Unsplash",
    page_url:
      "https://unsplash.com/photos/close-up-photography-of-red-fish-ekthrVC_DVs",
  },
];

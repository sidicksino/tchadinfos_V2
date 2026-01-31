const newsCategoryList = [
  {
    id: 1,
    title: "Tous",
    slug: "",
    selected: true,
  },
  {
    id: 2,
    title: "Sport",
    slug: "sports",
    selected: false,
  },
  {
    id: 3,
    title: "Économie", // Was Education (not supported directly, trying business/economy)
    slug: "business",
    selected: false,
  },
  {
    id: 4,
    title: "Culture",
    slug: "entertainment", // Closest match
    selected: false,
  },
  {
    id: 5,
    title: "Tech",
    slug: "technology",
    selected: false,
  },
  {
    id: 6,
    title: "Monde",
    slug: "world",
    selected: false,
  },
  {
    id: 7,
    title: "Politique",
    slug: "politics",
    selected: false,
  },
  {
    id: 8,
    title: "Santé",
    slug: "health", // Fixed: santé -> health
    selected: false,
  },
];

export default newsCategoryList;
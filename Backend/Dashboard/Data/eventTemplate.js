export const eventTemplate = {
  image: "",
  imageFile: null,

  title: "",
  category: "",

  // NEW – unified date/time model
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",

  location: "",
  description: "",

  tickets: {
    vvip: "",
    vip: "",
    regular: "",
    other: "",
  },

  freeEvent: false,
  attendees: [],

  status: "draft", // draft | upcoming | confirmed | cancelled | past
  uploaded: false,
  active: true,
};

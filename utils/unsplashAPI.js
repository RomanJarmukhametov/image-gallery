const accessKey = "y7iXFXJExdZbMfHXED9ElYj5d1l-WScDtQDfy2O3V4E"; // Typically, you'd use an environment variable here

//Function to fetch several images from Unsplash API
export const fetchImages = async (query = "art", count = 9) => {
  const url = `https://api.unsplash.com/photos/random?count=${count}&query=${query}&client_id=${accessKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  return data.map((image) => ({
    id: image.id,
    slug: image.slug,
    imageSrc: `${image.urls.raw}&crop=entropy&cs=tinysrgb&fit=crop&h=500&w=500`,
    imageAlt: image.alt_description || "No Alt Description",
  }));
};

//Function to fetch a single image from Unsplash API by slug
export const fetchImageBySlug = async (slug) => {
  const url = `https://api.unsplash.com/photos/${slug}?client_id=${accessKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  return {
    id: data.id,
    title: data.description || "No Description",
    imageSrc: `${data.urls.regular}&cs=tinysrgb&fit=cover&w=1482`,
    imageAlt: data.alt_description || "No Alt Description",
    authorAvatar: data.user.profile_image.medium,
    authorName: data.user.name,
    authorInstagramProfile: data.user.instagram_username,
    downloadLink: data.links.download,
  };
};

//Function to fetch several square images from Unsplash API by slug
export const fetchImagesBySlugs = async (slugs) => {
  const images = [];

  for (const slug of slugs) {
    const url = `https://api.unsplash.com/photos/${slug}?client_id=${accessKey}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      const image = {
        id: data.id,
        slug: data.slug,
        imageSrc: `${data.urls.raw}&crop=entropy&cs=tinysrgb&fit=crop&h=500&w=500`,
        imageAlt: data.alt_description || "No Alt Description",
      };

      images.push(image);
    } catch (error) {
      console.error(`Error fetching image with slug: ${slug}`, error);
    }
  }

  return images;
};

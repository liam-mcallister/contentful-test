const query = `{
    pageHomepageCollection {
      items {
        name
        header
        paragraph
        image {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
      }
    }
  }`;

const fetchOptions = {
  spaceID: "msdqy2w9u7ss",
  accessToken: "6uca9Yf3dvEn2SvfeBO6m47XNJCQKs1CRksrg1ezW-o",
  endpoint: "https://graphql.contentful.com/content/v1/spaces/msdqy2w9u7ss",
  method: "POST",
  headers: {
    Authorization: "Bearer 6uca9Yf3dvEn2SvfeBO6m47XNJCQKs1CRksrg1ezW-o",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ query }),
};

const addContentToDom = (items) => {
  items.forEach((item) => {
    // Create the article element to hold all post data elements
    const newItemEl = document.createElement("article");

    // Let's check if we have some text
    if (item.header) {
      // Create an h2 element
      const newHeaderEl = document.createElement("h1");
      // Populate with data
      newHeaderEl.innerText = item.header;

      // Add the text element to the article element
      newItemEl.appendChild(newHeaderEl);
    }

    // Let's check if we have some text
    if (item.paragraph) {
      // Create an h2 element
      const newParaEl = document.createElement("p");
      // Populate with data
      newParaEl.innerText = item.paragraph;

      // Add the text element to the article element
      newItemEl.appendChild(newParaEl);
    }

    // Let's check if we have an image
    if (item.image) {
      // Create an image element
      const newImgEl = document.createElement("img");
      // Populate with data
      newImgEl.src = `${item.image.url}?w=500`;
      newImgEl.alt = item.image.description;

      // Add the image element to the article element
      newItemEl.appendChild(newImgEl);
    }

    // Let's append the new article element to the DOM!
    document.body.appendChild(newItemEl);
  });
};

fetch(fetchOptions.endpoint, fetchOptions)
  .then((response) => response.json())
  .then((data) => addContentToDom(data.data.pageHomepageCollection.items));

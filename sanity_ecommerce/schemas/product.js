export default {
  title: 'Product',
  name: 'product',
  type: 'document',
  fields: [
    {
      title: 'Image',
      name: 'image',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        hotspot: true,
      },
    },
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 90,
      },
    },
    {
      title: 'Price',
      name: 'price',
      type: 'number',
    },
    {
      title: 'Details',
      name: 'details',
      type: 'string',
    },
  ],
}

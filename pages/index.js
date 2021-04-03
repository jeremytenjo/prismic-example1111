import { RichText } from 'prismic-reactjs'
import Prismic from '@prismicio/client'

import { Client } from 'utils/prismicHelpers'

const HomePage = ({ homePage = {}, shopItems }) => {
  return (
    <div>
      {homePage && (
        <>
          <RichText render={homePage.data.hero_message} />
          <RichText render={homePage.data.hero_button_text} />
          <RichText render={homePage.data.about_message} />
        </>
      )}

      {shopItems &&
        shopItems.results.map((item) => (
          <RichText key={item.data.id} render={item.data.name} />
        ))}
    </div>
  )
}

export async function getStaticProps({ preview = null, previewData = {} }) {
  const { ref } = previewData
  const client = Client()
  const homePage = (await client.getSingle('home', ref ? { ref } : null)) || {}
  const shopItems = await client.query(
    Prismic.Predicates.at('document.type', 'shop_item')
  )

  return {
    props: {
      homePage,
      shopItems,
      preview
    }
  }
}

export default HomePage

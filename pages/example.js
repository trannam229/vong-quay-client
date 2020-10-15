import MainLayout from '@layouts/main';
import axios from '@config/api-request';
function Example({ infoClient }) {
  return <MainLayout>Example page {infoClient.CfInfo.sex}</MainLayout>
}

export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const {data: infoClient} = await axios.get(`api/login`);
  return { props: { infoClient } }
}

export default Example;
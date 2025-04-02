// pages/gists/[id].js
export async function getServerSideProps(context) {
    const { id } = context.params;
    const response = await fetch(`${process.env.GITHUB_API_URL}/gists/${id}`, {
      // any required fetch options
    });
    const data = await response.json();
    return { props: { data } };
  }
  
  export default function GistPage({ data }) {
    return (
      <div>
        <h1>Gist Details</h1>
        {/* Render your data */}
      </div>
    );
  }
  
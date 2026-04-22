import Layout from '@/components/layout';
import DoingNowSection from '@/components/about/DoingNowSection';

export default function NowPage() {
  return (
    <div className="relative overflow-hidden">
      <Layout
        title="Now"
        subtitle="A current list of what I am working on, competing in, and building. Open any card for the full context."
      >
        <div className="mx-auto max-w-5xl">
          <DoingNowSection />
        </div>
      </Layout>
    </div>
  );
}

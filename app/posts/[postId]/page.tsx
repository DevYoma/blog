import { getPostsMeta, getPostByName } from "@/lib/posts"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getFormatedDate } from "@/lib/getFormattedDate"

// route segment config for revalidation(No caching)
export const revalidate = 86400;

type Prop = {
    params: {
        postId: string;
    }
}

// STATIC PARAMETERS
export async function generateStaticParams() {
    const posts = await getPostsMeta()

    if(!posts) return []

    return posts.map((post) => ({
        postId: post.id
    }))
}

// METADATA
export async function generateMetadata({ params }: Prop) {

    const { postId } = params
    const post = await getPostByName(`${postId}.mdx`)

    if (!post) {
        return {
            title: 'Post Not Found'
        }
    }

    return {
        title: post.meta.title,
    }
}

// COMPONENT  
export default async function Post({ params }: Prop) {

    // const post = getPostByName()
    const { postId } = params

    const post = await getPostByName(`${postId}.mdx`)

    if(!post) notFound()

    const { meta, content } = post;

    const pubDate = getFormatedDate(meta.date)

    const tags = meta.tags.map((tag, i) => (
        <Link key={i} href={`/tags/${tag}`}>
            {tag}
        </Link>
    ))

    return (
        <> 
            <h2 className="text-3xl mt-4 mb-0">{meta.title}</h2>
            <p className="mt-0 text-sm">
                {pubDate}
            </p>
            <article>
                {content}
            </article>
            <section>
                <h3>Related</h3>
                <div className="flex flex-row gap-4">{tags}</div>
            </section>
            <p className="mb-10">
                <Link href={'/'}>
                    Back to home
                </Link>
            </p>
        </>
    )
}
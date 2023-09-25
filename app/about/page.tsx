import Link from 'next/link'
import React from 'react'

export default function About() {
    return (
        <>
            <section className='my-10'>
                <h2 className='text-2xl'>About</h2>
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate vel magnam quidem dolorum neque, est illum amet voluptatibus quo culpa suscipit et accusantium doloribus. Sequi nostrum enim aut architecto nesciunt?</div>
                <Link className='bg-red-500' href="/about/faq">FAQ</Link>
            </section>
            
        </>
    )
}

import { NotFound } from '@/Components/app'
import { Seperator, Spacer } from '@/Components/utility'
import Image from 'next/image'
import React from 'react'
import CategoryCard from './CategoryCard'

const ViewAllCategories = ({
    categories,
}) => {
    return categories.length > 0 ? (
        categories.sort(
            (a, b) => a.name.localeCompare(b.name)
        ).map(category => (
            <div key={category.id}>
                <CategoryCard category={category} />
                <Seperator />
            </div>
        ))
    ) : (
        <NotFound message='No categories found' />
    )
}

export default ViewAllCategories
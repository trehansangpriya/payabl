import { Seperator } from '@/Components/utility'
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
        <div className='text-center text-layout-500'>
            No categories found
        </div>
    )
}

export default ViewAllCategories
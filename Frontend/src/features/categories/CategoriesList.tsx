import { useState } from 'react';
import { Category, useDeleteCategoryMutation, useGetCategoriesQuery } from './categoriesSlice';
import { AddCategoryModal } from './AddCategoryModal';
import { EditCategoryModal } from './EditCategoryModal';
import Table from '../../app/table/Table';
import { toast } from 'react-toastify';

export const CategoriesList = () => {
  const [page, setPage] = useState(1);
  const {
    data = {
      categories: [],
      totalPages: 0
    }
  } = useGetCategoriesQuery(page);
  const [deleteCategory] = useDeleteCategoryMutation();

  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);
  const [showEditForm, setShowEditForm] = useState(false);

  const onSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setShowEditForm(true);
  }

  const onDeleteCategory = async (category: Category) => {
    try {
      await deleteCategory(category.id).unwrap();
    } catch (err) {
      toast.error("Failed to delete the category!", {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }

  const renderedCategories = <>
    {data.categories.map((category: Category) => (
      <tr key={category.id} >
        <td>{category.name}</td>
        <td className="edit-delete-container">
          <button onClick={() => onSelectCategory(category)} className="edit-btn">
            <i
              className="bi bi-pencil-square edit-icon">
            </i>
          </button>
          <button onClick={() => onDeleteCategory(category)} className="delete-btn">
            <i
              className="bi bi-trash delete-icon">
            </i>
          </button>
        </td>
      </tr>
    ))}
  </>

  const tableHeader = <tr className="header">
    <th scope="col">Name</th>
    <th scope="col">&nbsp;</th>
  </tr>

  return (
    <>
      <Table title="Category List" addModalId="#addCategoryModal" header={tableHeader} body={renderedCategories} page={page}
        totalPages={data.totalPages} onSetPage={(currentPage: number) => setPage(currentPage)} />
      <AddCategoryModal />
      {(showEditForm && selectedCategory) && <EditCategoryModal show={showEditForm} category={selectedCategory} 
        onClose={() => { setShowEditForm(false); setSelectedCategory(undefined); }} />}
    </>
  )
}

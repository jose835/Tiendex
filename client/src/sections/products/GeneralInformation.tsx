import FieldInput from '../../components/forms/FieldInput';
import TextArea from '../../components/forms/TextArea';
import DragDropFile from '../../components/forms/DragDropFile';
import Select from '../../components/forms/Select';
import { useEffect, useState } from 'react';
import { AddProductProps, CategoryOption, SubCategoryProps } from '../../types/types';
import { getSubCategories } from '../../api/inventory/product';

interface Props {
  formData: AddProductProps;
  handleInputChange: (key: keyof AddProductProps, value: any) => void;
}

export default function GeneralInformation({ formData, handleInputChange }: Props) {
  const [categories, setCategories] = useState<CategoryOption[]>([]);

  useEffect(() => {
    async function loadCategories() {
      const { data }: { data: SubCategoryProps[] } = await getSubCategories();
      const formatData = data.map((item) => ({
        label: item.name,
        value: item.subCategoryId,
      }));

      setCategories(formatData);
    }

    loadCategories();
  }, []);

  return (
    <div className="bg-white rounded-lg mt-8 px-4 py-5">
      <FieldInput
        onChange={(e) => handleInputChange('name', e.target.value)}
        name="Titulo"
        required
        placeholder="Ej: Camiseta de manga corta"
        id="title"
        value={formData.name}
      />
      <TextArea
        onChange={(e) => handleInputChange('description', e.target.value || '')}
        name="Descripcion"
        placeholder="Agrega una descripción"
        id="description"
        rows={8}
        value={formData.description}
      />
      <DragDropFile />
      <Select
        name="Categoría"
        value={categories}
        placeholder="Electrónica, Ropa, Hogar y más..."
        onChange={(value) => handleInputChange('subCategoryId', value)}
      />
    </div>
  );
}

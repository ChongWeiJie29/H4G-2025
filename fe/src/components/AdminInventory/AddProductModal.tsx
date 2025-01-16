import React, { useState } from "react";
import styled from "styled-components";
import { Product, ProductTag } from "../../definitions/Product"; // Assuming ProductTag enum is imported from the correct file

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 400px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

const ModalButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:first-child {
    background-color: #ddd;
    color: black;
  }

  &:last-child {
    background-color: #007bff;
    color: white;
  }
`;

interface AddProductModalProps {
  onAdd: (newProduct: Product) => void;
  onCancel: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState<Product>({
    name: "",
    tag: ProductTag.Electronics, // Set a default value from the ProductTag enum
    link: "",
    price: 0,
    quantity: 0,
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? +value : value,
    }));
  };

  const handleAdd = () => {
    onAdd(formData);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h3>Add New Product</h3>
        <FormGroup>
          <Label>Name</Label>
          <Input name="name" value={formData.name} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>Tag</Label>
          <Select name="tag" value={formData.tag} onChange={handleChange}>
            {Object.values(ProductTag).map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Link</Label>
          <Input name="link" value={formData.link} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>Price</Label>
          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Quantity</Label>
          <Input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Description</Label>
          <TextArea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </FormGroup>
        <ModalActions>
          <ModalButton onClick={onCancel}>Cancel</ModalButton>
          <ModalButton onClick={handleAdd}>Add</ModalButton>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddProductModal;

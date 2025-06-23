import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Upload, Plus, Trash2, Save, Calendar, Package } from "lucide-react";
import "swiper/css";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { useFiles } from "@/hooks/useFiles";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProductInputDto } from "@/types/product";
import { InputField } from "./InputField";
import { Form } from "./ui/form";

// Field types for custom fields
const FIELD_TYPES = [
  { value: "text", label: "Text" },
  { value: "select", label: "Select" },
  { value: "description", label: "Description" },
];

interface ProductFormProps {
  initialData?: any;
  onSuccess?: () => void;
}

const ProductForm = ({ initialData, onSuccess }: ProductFormProps) => {
  const navigate = useNavigate();
  const { isCreating, isUpdating, createProduct, updateProduct } =
    useProducts();
  const { getUrlUpload, uploadFile } = useFiles();

  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadedImages, setUploadedImages] = useState(
    initialData?.images || []
  );
  const [imagePreviews, setImagePreviews] = useState([]);
  const [customFieldValues, setCustomFieldValues] = useState({});

  const form = useForm({
    resolver: zodResolver(CreateProductInputDto),
    defaultValues: {
      ...initialData,
      images: initialData?.images || [],
      customFields: initialData?.customFields || [],
      isActive: initialData?.isActive ?? true,
    },
  });

  const { control, handleSubmit, setValue, watch } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "customFields",
  });

  // Handle custom field value changes
  const handleCustomFieldChange = (index, field, value) => {
    setCustomFieldValues((prev) => ({
      ...prev,
      [`${index}-${field}`]: value,
    }));
  };

  // Add new custom field
  const addCustomField = () => {
    append({
      key: "",
      value: "",
      type: "text",
      options: [], // For select fields
    });
  };

  const handleImageUpload = async (files) => {
    if (!files) return;

    const previewList = [];
    const newImageUrls = [];

    for (const file of Array.from(files)) {
      const previewUrl = URL.createObjectURL(file);
      previewList.push(previewUrl);
      newImageUrls.push(previewUrl); // Mock URL
    }

    setImagePreviews((prev) => [...prev, ...previewList]);
    const updatedUploaded = [...uploadedImages, ...newImageUrls];
    setUploadedImages(updatedUploaded);
    setValue("images", updatedUploaded);
  };

  const removeImage = (index) => {
    const newUploaded = [...uploadedImages];
    newUploaded.splice(index, 1);
    setUploadedImages(newUploaded);
    setValue("images", newUploaded);

    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  const onSubmit = (data) => {
    const mutation = createProduct;
    mutation({ body: data });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <Form {...form}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Name and Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Name and Description
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <InputField
                    control={control}
                    label="Product Name"
                    name="name"
                    placeholder="Premium Half Sleeve T-Shirt - Brooklyn Fleece"
                  />
                  <InputField
                    control={control}
                    label="Product Description"
                    name="description"
                    type="textarea"
                    placeholder="Looking for a little extra warmth? Grab this classic hoodie. Smooth on the outside with unbrushed loops on the inside, our mid weight French terry is comfortable enough to wear year long."
                  />

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Product Details
                    </Label>
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>
                          • Body: 80% cotton/20% polyester, Hood lining: 100%
                          cotton
                        </li>
                        <li>• Colour Shown: Black/White</li>
                        <li>• Style: FV7283-010</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Category */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Category
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Product Category
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Men's Clothes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mens-clothes">
                          Men's Clothes
                        </SelectItem>
                        <SelectItem value="womens-clothes">
                          Women's Clothes
                        </SelectItem>
                        <SelectItem value="kids-clothes">
                          Kids' Clothes
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Product Sub-Category
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Men's Tops & T-Shirts" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mens-tops">
                          Men's Tops & T-Shirts
                        </SelectItem>
                        <SelectItem value="mens-pants">Men's Pants</SelectItem>
                        <SelectItem value="mens-accessories">
                          Men's Accessories
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <InputField
                    control={control}
                    label="Category ID"
                    name="categoryId"
                    placeholder="Enter category ID"
                  />

                  <InputField
                    control={control}
                    label="Subcategory ID"
                    name="subcategoryId"
                    placeholder="Enter subcategory ID"
                  />
                </CardContent>
              </Card>

              {/* Manage Stock */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Manage Stock
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Stock Keeping Unit
                      </Label>
                      <Input placeholder="SKU-BB-66-A6" className="h-10" />
                    </div>
                    <InputField
                      control={control}
                      label="Badge ID"
                      name="badgeId"
                      placeholder="Enter badge ID"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      control={control}
                      label="Product Stock"
                      name="stock"
                      type="number"
                      placeholder="10,120"
                    />
                    <InputField
                      control={control}
                      label="Minimum Stock"
                      name="minimumStock"
                      type="number"
                      placeholder="100"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Custom Fields */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Custom Fields
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="p-4 border rounded-lg space-y-4 bg-gray-50"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Field Type */}
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">
                            Field Type
                          </Label>
                          <Select
                            value={customFieldValues[`${index}-type`] || "text"}
                            onValueChange={(value) =>
                              handleCustomFieldChange(index, "type", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              {FIELD_TYPES.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Field Key */}
                        <InputField
                          control={control}
                          label="Field Key"
                          name={`customFields.${index}.key`}
                          placeholder="e.g., material, size, color"
                        />

                        {/* Field Label */}
                        <InputField
                          control={control}
                          label="Field Label"
                          name={`customFields.${index}.label`}
                          placeholder="Display name"
                        />
                      </div>

                      {/* Field Value - Changes based on type */}
                      <div className="grid grid-cols-1 gap-4">
                        {(customFieldValues[`${index}-type`] || "text") ===
                          "text" && (
                          <InputField
                            control={control}
                            label="Field Value"
                            name={`customFields.${index}.value`}
                            placeholder="Enter text value"
                          />
                        )}

                        {(customFieldValues[`${index}-type`] || "text") ===
                          "description" && (
                          <InputField
                            control={control}
                            label="Description"
                            name={`customFields.${index}.value`}
                            type="textarea"
                            placeholder="Enter detailed description"
                          />
                        )}

                        {(customFieldValues[`${index}-type`] || "text") ===
                          "select" && (
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                              Select Options
                            </Label>
                            <div className="space-y-2">
                              <Input
                                placeholder="Enter options separated by commas (e.g., Small, Medium, Large)"
                                value={
                                  customFieldValues[`${index}-options`] || ""
                                }
                                onChange={(e) =>
                                  handleCustomFieldChange(
                                    index,
                                    "options",
                                    e.target.value
                                  )
                                }
                              />
                              <p className="text-xs text-gray-500">
                                Separate multiple options with commas
                              </p>
                            </div>

                            {/* Selected Value */}
                            <div className="mt-2">
                              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                                Selected Value
                              </Label>
                              <Select
                                value={
                                  customFieldValues[`${index}-value`] || ""
                                }
                                onValueChange={(value) =>
                                  handleCustomFieldChange(index, "value", value)
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Choose from options" />
                                </SelectTrigger>
                                <SelectContent>
                                  {(customFieldValues[`${index}-options`] || "")
                                    .split(",")
                                    .filter(Boolean)
                                    .map((option, optIndex) => (
                                      <SelectItem
                                        key={optIndex}
                                        value={option.trim()}
                                      >
                                        {option.trim()}
                                      </SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Remove Button */}
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => remove(index)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove Field
                        </Button>
                      </div>
                    </div>
                  ))}

                  {fields.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No custom fields added yet</p>
                      <p className="text-sm">
                        Add custom fields to capture additional product
                        information
                      </p>
                    </div>
                  )}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addCustomField}
                    className="w-full border-dashed border-2 hover:border-solid"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Custom Field
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Product Details */}
            <div className="space-y-6">
              {/* Product Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Product Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Brand Name
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Adidas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="adidas">Adidas</SelectItem>
                        <SelectItem value="nike">Nike</SelectItem>
                        <SelectItem value="puma">Puma</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                      id="isActive"
                      checked={watch("isActive")}
                      onCheckedChange={(val) => setValue("isActive", !!val)}
                    />
                    <Label htmlFor="isActive" className="text-sm">
                      Product Active
                    </Label>
                  </div>
                </CardContent>
              </Card>

              {/* Product Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Product Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      control={control}
                      label="Price"
                      name="price"
                      type="number"
                      placeholder="12,120.00"
                    />
                    <InputField
                      control={control}
                      label="Price"
                      name="promotionalPrice"
                      type="number"
                      placeholder="10,120.00"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Discount
                      </Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="15%" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10%</SelectItem>
                          <SelectItem value="15">15%</SelectItem>
                          <SelectItem value="20">20%</SelectItem>
                          <SelectItem value="25">25%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <InputField
                      control={control}
                      label="Minimum Order"
                      name="minimumOrder"
                      type="number"
                      placeholder="100"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Product Image */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    Product Image
                    <Badge variant="secondary" className="text-xs">
                      ?
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e.target.files)}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer flex flex-col items-center gap-2"
                      >
                        <Upload className="w-8 h-8 text-gray-400" />
                        <span className="text-sm text-blue-600 hover:text-blue-700">
                          Click to Upload
                        </span>
                      </label>
                    </div>

                    {imagePreviews.length > 0 && (
                      <div className="grid grid-cols-2 gap-2">
                        {imagePreviews.slice(0, 2).map((preview, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-80 group-hover:opacity-100 transition text-xs"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => console.log("Save product")}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Product
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => console.log("Schedule")}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </Button>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={isCreating || isUpdating}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ProductForm;

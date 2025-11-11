// AdminScreen.tsx
// PURPOSE: Admin panel for managing products (CRUD operations)
// WHY: Admins need to add, edit, and delete products
// WHAT IT DOES: Displays products list with add/edit/delete functionality

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ScrollView,
  RefreshControl,
  Image,
} from 'react-native';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

interface Category {
  id: number;
  name: string;
}

/**
 * # ADMIN SCREEN COMPONENT
 * WHY: Centralized product management interface
 * WHAT: Full CRUD operations for products
 */
const AdminScreen = ({ navigation }: any) => {
  // # STATE MANAGEMENT
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
  });

  const baseUrl = 'http://10.0.2.2:8080/api';

  /**
   * # FETCH DATA
   * WHY: Load products and categories from backend
   */
  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch(`${baseUrl}/products`),
        fetch(`${baseUrl}/categories`),
      ]);

      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();

      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to load data');
    }
  };

  /**
   * # ON REFRESH
   * WHY: Pull-to-refresh functionality
   */
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  // Load data on mount
  useEffect(() => {
    fetchData();
  }, []);

  /**
   * # OPEN ADD MODAL
   * WHY: Create new product
   */
  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({ name: '', category: '', price: '', stock: '' });
    setModalVisible(true);
  };

  /**
   * # OPEN EDIT MODAL
   * WHY: Edit existing product
   */
  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
    });
    setModalVisible(true);
  };

  /**
   * # SAVE PRODUCT
   * WHY: Create or update product
   */
  const saveProduct = async () => {
    // Validate inputs
    if (!formData.name || !formData.category || !formData.price || !formData.stock) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const productData = {
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
    };

    try {
      const url = editingProduct
        ? `${baseUrl}/products/${editingProduct.id}`
        : `${baseUrl}/products`;
      
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!response.ok) throw new Error('Failed to save product');

      Alert.alert('Success', editingProduct ? 'Product updated!' : 'Product added!');
      setModalVisible(false);
      fetchData(); // Reload products
    } catch (error) {
      console.error('Error saving product:', error);
      Alert.alert('Error', 'Failed to save product');
    }
  };

  /**
   * # DELETE PRODUCT
   * WHY: Remove product from database
   */
  const deleteProduct = async (id: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`${baseUrl}/products/${id}`, {
                method: 'DELETE',
              });

              if (!response.ok) throw new Error('Failed to delete product');

              Alert.alert('Success', 'Product deleted!');
              fetchData(); // Reload products
            } catch (error) {
              console.error('Error deleting product:', error);
              Alert.alert('Error', 'Failed to delete product');
            }
          },
        },
      ]
    );
  };

  /**
   * # GET PRODUCT IMAGE
   * WHY: Display category-specific images
   */
  const getProductImage = (category: string) => {
    const images: { [key: string]: string } = {
      Electronics: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
      Clothing: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
      Books: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
      Furniture: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
      Food: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
    };
    return images[category] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400';
  };

  /**
   * # GET STOCK STATUS
   * WHY: Visual indicator for stock levels
   */
  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'Out of Stock', color: '#e74c3c' };
    if (stock < 20) return { text: 'Low Stock', color: '#f39c12' };
    return { text: 'In Stock', color: '#27ae60' };
  };

  /**
   * # RENDER PRODUCT ITEM
   * WHY: Display each product with edit/delete buttons
   */
  const renderProduct = ({ item }: { item: Product }) => {
    const stockStatus = getStockStatus(item.stock);

    return (
      <View style={styles.productCard}>
        <Image
          source={{ uri: getProductImage(item.category) }}
          style={styles.productImage}
        />
        
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.categoryTag}>{item.category}</Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            <View style={[styles.stockBadge, { backgroundColor: stockStatus.color }]}>
              <Text style={styles.stockText}>{item.stock}</Text>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.editBtn]}
            onPress={() => openEditModal(item)}
          >
            <Text style={styles.actionBtnText}>✏️ Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, styles.deleteBtn]}
            onPress={() => deleteProduct(item.id)}
          >
            <Text style={styles.actionBtnText}>🗑️ Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* # HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin Panel</Text>
        <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {/* # PRODUCTS LIST */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No products found</Text>
        }
      />

      {/* # ADD/EDIT MODAL */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>
                {editingProduct ? 'Edit Product' : 'Add Product'}
              </Text>

              {/* Product Name */}
              <Text style={styles.label}>Product Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter product name"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
              />

              {/* Category Picker */}
              <Text style={styles.label}>Category</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      styles.categoryPill,
                      formData.category === cat.name && styles.categoryPillActive,
                    ]}
                    onPress={() => setFormData({ ...formData, category: cat.name })}
                  >
                    <Text
                      style={[
                        styles.categoryPillText,
                        formData.category === cat.name && styles.categoryPillTextActive,
                      ]}
                    >
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Price */}
              <Text style={styles.label}>Price ($)</Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                keyboardType="numeric"
                value={formData.price}
                onChangeText={(text) => setFormData({ ...formData, price: text })}
              />

              {/* Stock */}
              <Text style={styles.label}>Stock Quantity</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                keyboardType="numeric"
                value={formData.stock}
                onChangeText={(text) => setFormData({ ...formData, stock: text })}
              />

              {/* Action Buttons */}
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.modalBtn, styles.cancelBtn]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalBtn, styles.saveBtn]}
                  onPress={saveProduct}
                >
                  <Text style={styles.saveBtnText}>
                    {editingProduct ? 'Update' : 'Save'}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// # STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    padding: 16,
    paddingTop: 40,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 16,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  productInfo: {
    marginBottom: 12,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  categoryTag: {
    fontSize: 12,
    color: '#7f8c8d',
    backgroundColor: '#ecf0f1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  stockBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  stockText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  editBtn: {
    backgroundColor: '#3498db',
  },
  deleteBtn: {
    backgroundColor: '#e74c3c',
  },
  actionBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: 16,
    marginTop: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dfe6e9',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  categoryPill: {
    backgroundColor: '#ecf0f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginVertical: 8,
  },
  categoryPillActive: {
    backgroundColor: '#3498db',
  },
  categoryPillText: {
    color: '#2c3e50',
    fontWeight: '600',
  },
  categoryPillTextActive: {
    color: '#fff',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  modalBtn: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: '#ecf0f1',
  },
  cancelBtnText: {
    color: '#2c3e50',
    fontWeight: 'bold',
    fontSize: 16,
  },
  saveBtn: {
    backgroundColor: '#27ae60',
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AdminScreen;

// DashboardScreen.tsx
// PURPOSE: Main dashboard showing stats and products
// WHY: Central hub for viewing app data
// WHAT IT DOES: Displays statistics, categories, and product cards

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';

/**
 * # DASHBOARD SCREEN
 * WHY: Shows overview of products and statistics
 * WHAT: Stats cards + Product grid with images
 */
const DashboardScreen = ({ navigation }: any) => {
  // # STATE MANAGEMENT
  const [stats, setStats] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  /**
   * # FETCH DATA
   * WHY: Load dashboard data from backend
   * HOW: Parallel API calls using Promise.all
   */
  const fetchData = async () => {
    try {
      // # NOTE: Android emulator uses 10.0.2.2 to access host machine's localhost
      // For physical device: Change to your computer's IP (e.g., http://192.168.1.100:8080)
      const baseUrl = 'http://10.0.2.2:8080/api';
      const [statsRes, productsRes, categoriesRes] = await Promise.all([
        fetch(`${baseUrl}/dashboard/stats`),
        fetch(`${baseUrl}/products`),
        fetch(`${baseUrl}/categories`),
      ]);

      const statsData = await statsRes.json();
      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();

      setStats(statsData);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // # LOAD DATA ON MOUNT
  useEffect(() => {
    fetchData();
  }, []);

  /**
   * # GET PRODUCT IMAGE
   * WHY: Assign realistic images based on category
   * Same as web version
   */
  const getProductImage = (product: any) => {
    const categoryImages: any = {
      Electronics: [
        'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=400&h=300&fit=crop',
      ],
      Mobiles: [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop',
      ],
      Food: [
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
      ],
    };

    const images = categoryImages[product.categoryName] || [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    ];

    return images[(product.id - 1) % images.length];
  };

  /**
   * # PULL TO REFRESH
   * WHY: Allow users to manually refresh data
   */
  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* # HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.adminButton}
            onPress={() => navigation.navigate('Admin')}
          >
            <Text style={styles.adminButtonText}>⚙️ Admin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => navigation.replace('Login')}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* # STATS GRID */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats?.totalProducts || 0}</Text>
          <Text style={styles.statLabel}>Products</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats?.totalCategories || 0}</Text>
          <Text style={styles.statLabel}>Categories</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>₹{stats?.totalInventoryValue?.toLocaleString() || 0}</Text>
          <Text style={styles.statLabel}>Inventory</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats?.totalStock || 0}</Text>
          <Text style={styles.statLabel}>Stock</Text>
        </View>
      </View>

      {/* # CATEGORIES */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoryContainer}>
          {categories.map((cat) => (
            <View key={cat.id} style={styles.categoryTag}>
              <Text style={styles.categoryText}>{cat.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* # PRODUCTS GRID */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Products Available ({products.length})</Text>
        <View style={styles.productsGrid}>
          {products.map((product) => (
            <View key={product.id} style={styles.productCard}>
              {/* Product Image */}
              <Image
                source={{ uri: getProductImage(product) }}
                style={styles.productImage}
                resizeMode="cover"
              />
              
              {/* Stock Badge */}
              <View
                style={[
                  styles.stockBadge,
                  product.stock > 10
                    ? styles.inStock
                    : product.stock > 0
                    ? styles.lowStock
                    : styles.outOfStock,
                ]}
              >
                <Text style={styles.stockText}>
                  {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                </Text>
              </View>

              {/* Product Details */}
              <View style={styles.productDetails}>
                <Text style={styles.categoryBadge}>{product.categoryName}</Text>
                <Text style={styles.productName} numberOfLines={1}>
                  {product.name}
                </Text>
                <View style={styles.productFooter}>
                  <Text style={styles.productPrice}>₹{product.price.toLocaleString()}</Text>
                  <Text style={styles.productStock}>{product.stock} units</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

/**
 * # STYLES
 * WHY: React Native styling similar to CSS
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  header: {
    backgroundColor: '#007bff',
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  adminButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  adminButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    gap: 10,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryTag: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryText: {
    color: '#007bff',
    fontWeight: '600',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '47%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#f0f0f0',
  },
  stockBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  inStock: {
    backgroundColor: '#28a745',
  },
  lowStock: {
    backgroundColor: '#ffc107',
  },
  outOfStock: {
    backgroundColor: '#dc3545',
  },
  stockText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  productDetails: {
    padding: 12,
  },
  categoryBadge: {
    fontSize: 11,
    color: '#666',
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
  },
  productStock: {
    fontSize: 12,
    color: '#666',
  },
});

export default DashboardScreen;

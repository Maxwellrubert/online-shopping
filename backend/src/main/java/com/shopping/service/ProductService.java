package com.shopping.service; 

import com.shopping.dto.DashboardStats;
import com.shopping.dto.ProductDTO;
import com.shopping.entity.Category;
import com.shopping.entity.Product;
import com.shopping.repository.CategoryRepository;
import com.shopping.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    public List<ProductDTO> getAllProducts() {
        // Get all products from database
        List<Product> products = productRepository.findAll();

        return products.stream()
                .map(this::convertToDTO)  // Convert each product to DTO
                .collect(Collectors.toList());
    }
    
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
    
    public DashboardStats getDashboardStats() {
        // Count products and categories
        Long totalProducts = productRepository.count();
        Long totalCategories = categoryRepository.count();
        
        // Calculate total inventory value: SUM(price × stock)
        BigDecimal totalValue = productRepository.calculateTotalInventoryValue();
        // If no products, totalValue will be null, so default to 0
        if (totalValue == null) {
            totalValue = BigDecimal.ZERO;
        }
        
        // Calculate total stock: SUM(stock)
        Integer totalStock = productRepository.calculateTotalStock();
        if (totalStock == null) {
            totalStock = 0;
        }
        
        // Return all stats in one DTO object
        return new DashboardStats(totalProducts, totalCategories, totalValue, totalStock);
    }
    private ProductDTO convertToDTO(Product product) {
        return new ProductDTO(
            product.getId(),
            product.getName(),
            product.getCategory().getName(),  // Extract category name
            product.getPrice(),
            product.getStock()
        );
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }
    
    public Product getProductById(Integer id) {
        // orElse(null): If not found, return null
        return productRepository.findById(id).orElse(null);
    }
    
    public ProductDTO createProduct(ProductDTO productDTO) {
        Category category = categoryRepository.findByName(productDTO.getCategoryName())
                .orElseThrow(() -> new RuntimeException("Category not found: " + productDTO.getCategoryName()));
        
        // Step 2: Create new Product entity
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setCategory(category);  // Set the Category entity (not just name)
        product.setPrice(productDTO.getPrice());
        product.setStock(productDTO.getStock());
        Product savedProduct = productRepository.save(product);
        return convertToDTO(savedProduct);
    }
    
    public ProductDTO updateProduct(Integer id, ProductDTO productDTO) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        
        Category category = categoryRepository.findByName(productDTO.getCategoryName())
                .orElseThrow(() -> new RuntimeException("Category not found: " + productDTO.getCategoryName()));
        
        product.setName(productDTO.getName());
        product.setCategory(category);
        product.setPrice(productDTO.getPrice());
        product.setStock(productDTO.getStock());
        
        Product updatedProduct = productRepository.save(product);
        
        return convertToDTO(updatedProduct);
    }
    

    public void deleteProduct(Integer id) {
        // Verify product exists
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        
        productRepository.deleteById(id);
    }
}

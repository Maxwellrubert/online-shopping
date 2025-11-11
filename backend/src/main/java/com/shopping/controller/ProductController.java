package com.shopping.controller;

import com.shopping.dto.DashboardStats;
import com.shopping.dto.ProductDTO;
import com.shopping.entity.Category;
import com.shopping.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    
    @Autowired
    private ProductService productService;
    @GetMapping("/products")
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<ProductDTO> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }
    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = productService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/dashboard/stats")
    public ResponseEntity<DashboardStats> getDashboardStats() {
        DashboardStats stats = productService.getDashboardStats();
        return ResponseEntity.ok(stats);
    }

    @PostMapping("/products")
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO) {
        // @RequestBody: Spring automatically converts JSON to ProductDTO object
        ProductDTO created = productService.createProduct(productDTO);
        
        // ResponseEntity.ok() = HTTP 200 status + JSON response
        return ResponseEntity.ok(created);
    }
    
    @PutMapping("/products/{id}")
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable Integer id,           // Extract ID from URL
            @RequestBody ProductDTO productDTO  // Extract product data from JSON body
    ) {
        // @PathVariable: Gets {id} from URL path
        // If URL is /api/products/5, then id = 5
        
        ProductDTO updated = productService.updateProduct(id, productDTO);
        return ResponseEntity.ok(updated);
    }
    
    @DeleteMapping("/products/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Integer id) {
        productService.deleteProduct(id);
        
        // Return success message as plain text
        return ResponseEntity.ok("Product deleted successfully");
    }
}

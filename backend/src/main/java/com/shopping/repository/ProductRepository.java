package com.shopping.repository;

import com.shopping.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByCategoryId(Integer categoryId);
    
    @Query("SELECT SUM(p.price * p.stock) FROM Product p")
    BigDecimal calculateTotalInventoryValue();
    
    @Query("SELECT SUM(p.stock) FROM Product p")
    Integer calculateTotalStock();
    
    @Query("SELECT COUNT(p) FROM Product p")
    Long countTotalProducts();
}

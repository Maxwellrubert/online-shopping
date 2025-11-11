package com.shopping.dto;

import java.math.BigDecimal;

public class DashboardStats {
    private Long totalProducts;           // Count of all products
    private Long totalCategories;         // Count of all categories
    private BigDecimal totalInventoryValue; // Sum of (price × stock) for all products
    private Integer totalStock;           // Sum of stock for all products
    
    public DashboardStats() {}
    
    public DashboardStats(Long totalProducts, Long totalCategories, BigDecimal totalInventoryValue, Integer totalStock) {
        this.totalProducts = totalProducts;
        this.totalCategories = totalCategories;
        this.totalInventoryValue = totalInventoryValue;
        this.totalStock = totalStock;
    }
    
    public Long getTotalProducts() { return totalProducts; }
    public void setTotalProducts(Long totalProducts) { this.totalProducts = totalProducts; }
    
    public Long getTotalCategories() { return totalCategories; }
    public void setTotalCategories(Long totalCategories) { this.totalCategories = totalCategories; }
    
    public BigDecimal getTotalInventoryValue() { return totalInventoryValue; }
    public void setTotalInventoryValue(BigDecimal totalInventoryValue) { this.totalInventoryValue = totalInventoryValue; }
    
    public Integer getTotalStock() { return totalStock; }
    public void setTotalStock(Integer totalStock) { this.totalStock = totalStock; }
}

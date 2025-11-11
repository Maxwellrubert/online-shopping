package com.shopping.dto;

import java.math.BigDecimal;

public class ProductDTO {
    private Integer id;
    private String name;
    private String categoryName;  // Just the name, not the entire Category object
    private BigDecimal price;
    private Integer stock;
    
    public ProductDTO() {}
    
    public ProductDTO(Integer id, String name, String categoryName, BigDecimal price, Integer stock) {
        this.id = id;
        this.name = name;
        this.categoryName = categoryName;
        this.price = price;
        this.stock = stock;
    }
    
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
    
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    
    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }
}

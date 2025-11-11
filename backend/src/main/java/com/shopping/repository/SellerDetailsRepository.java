package com.shopping.repository;

import com.shopping.entity.SellerDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerDetailsRepository extends JpaRepository<SellerDetails, Integer> {
}


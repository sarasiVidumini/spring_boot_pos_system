package lk.ijse.backend.service;

import lk.ijse.backend.dto.OrderDTO;
import lk.ijse.backend.entity.Order;

import java.util.List;

public interface OrderService {
    public void placeOrder(OrderDTO orderDTO);
    public List<OrderDTO> getOrders();
}

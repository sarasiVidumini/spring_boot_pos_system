package lk.ijse.backend.service.impl;

import jakarta.transaction.Transactional;
import lk.ijse.backend.dto.OrderDTO;
import lk.ijse.backend.dto.OrderDetailDTO;
import lk.ijse.backend.entity.Customer;
import lk.ijse.backend.entity.Item;
import lk.ijse.backend.entity.Order;
import lk.ijse.backend.entity.OrderDetail;
import lk.ijse.backend.repository.CustomerRepo;
import lk.ijse.backend.repository.ItemRepo;
import lk.ijse.backend.repository.OrderDetailRepo;
import lk.ijse.backend.repository.OrderRepo;
import lk.ijse.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional

public class OrderServiceIMPL implements OrderService {

    private final OrderRepo orderRepo;
    private final CustomerRepo customerRepo;
    private final ItemRepo itemRepo;
    private final OrderDetailRepo orderDetailRepo;

    @Override
    public void placeOrder(OrderDTO orderDTO){
        Customer customer = customerRepo.findById(Long.valueOf(orderDTO.getCustomerId()))
                .orElseThrow(() -> new RuntimeException("Customer not found: " + orderDTO.getCustomerId()));

        Order order = new Order();
        order.setDate(orderDTO.getDate());
        order.setCustomer(customer);

        List<OrderDetail> details = new ArrayList<>();

        for (OrderDetailDTO detailDTO : orderDTO.getOrderDetail()){
            Item item = itemRepo.findById(Long.valueOf(detailDTO.getItemId()))
                    .orElseThrow(() -> new RuntimeException("Item not found: " + detailDTO.getItemId()));

            if (item.getQtyOnHand()<detailDTO.getQty()){
                throw new RuntimeException("Insufficient stock for item: " + item.getId());
            }

            item.setQtyOnHand(item.getQtyOnHand()- detailDTO.getQty());
            itemRepo.save(item);

            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setOrder(order);
            orderDetail.setItem(item);
            orderDetail.setQty(detailDTO.getQty());
            orderDetail.setUnitPrice(detailDTO.getUnitPrice());

            details.add(orderDetail);
        }

        order.setOrderDetails(details);

        orderRepo.save(order);
    }

    @Override
    public List<OrderDTO> getOrders() {
        List<Order> orders = orderRepo.findAll();
        List<OrderDTO> orderDTOS = new ArrayList<>();

        for (Order order : orders) {
            OrderDTO dto = new OrderDTO();
            dto.setOrderId(order.getId());
            dto.setDate(order.getDate());
            dto.setCustomerId(String.valueOf(order.getCustomer().getId()));


            List<OrderDetailDTO> detailDTOS = new ArrayList<>();
            for (OrderDetail detail : order.getOrderDetails()) {
                OrderDetailDTO detailDTO = new OrderDetailDTO();
                detailDTO.setItemId(Long.valueOf(detail.getItem().getId()));
                detailDTO.setQty(detail.getQty());
                detailDTO.setUnitPrice(detail.getUnitPrice());
                detailDTOS.add(detailDTO);
            }

            dto.setOrderDetail(detailDTOS);
            orderDTOS.add(dto);
        }
        return orderDTOS;
    }
}

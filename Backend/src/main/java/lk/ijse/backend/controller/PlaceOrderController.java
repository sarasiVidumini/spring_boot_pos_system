package lk.ijse.backend.controller;

import lk.ijse.backend.dto.OrderDTO;
import lk.ijse.backend.service.impl.OrderServiceIMPL;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/orders")
@CrossOrigin(origins = "*")
public class PlaceOrderController {

    private final OrderServiceIMPL orderServiceIMPL;

    @PostMapping
    public ResponseEntity<String> placeOrder(@RequestBody OrderDTO orderDTO) {
        orderServiceIMPL.placeOrder(orderDTO);
        return ResponseEntity.ok("Order Placed Successfully");
    }

    // අලුතින් එකතු කළ GetMapping එක
    @GetMapping
    public ResponseEntity<List<OrderDTO>> getAllOrders() {
        List<OrderDTO> allOrders = orderServiceIMPL.getOrders();
        return new ResponseEntity<>(allOrders, HttpStatus.OK);
    }
}
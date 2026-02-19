package lk.ijse.backend.controller;

import lk.ijse.backend.dto.ItemDTO;
import lk.ijse.backend.entity.Item;
import lk.ijse.backend.service.impl.ItemServiceIMPL;
import lk.ijse.backend.util.APIResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/v1/items")
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Validated

public class ItemController {
    private final ItemServiceIMPL itemServiceIMPL;

    @PostMapping
    public ResponseEntity<APIResponse<String>> saveItem(@RequestBody ItemDTO itemDTO) {
        itemServiceIMPL.saveItem(itemDTO);
        return new ResponseEntity<>(new APIResponse<>(210,"Item saved Successfully",null), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<APIResponse<String>> updateItem(@RequestBody ItemDTO itemDTO) {
        itemServiceIMPL.updateItem(itemDTO);
        return new ResponseEntity<>(new APIResponse<>(200,"Item updated successfully",null),HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<APIResponse<String>> deleteItem(@PathVariable long id) {
        itemServiceIMPL.deleteItem(id);
        return new ResponseEntity<>(new APIResponse<>(200,"Item deleted successfully",null),HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<APIResponse<Iterable<ItemDTO>>> getAllItems() {
        Iterable<ItemDTO> itemDTOS = itemServiceIMPL.getAllItems();
        return new ResponseEntity<>(new APIResponse<>(200,"Items List Successfully", itemDTOS),HttpStatus.OK);
    }
}

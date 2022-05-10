import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <Card className="card">
      <CardMedia 
      component="img"
      image={product.image}
      aria-label="stars"
      />
      <CardContent>
        <Typography variant="p">
          {product.name}
        </Typography>
        <Typography color="textSecondary" variant="subtitle2">
          ${product.cost}
        </Typography>
        <Rating name="half-rating" precision={0.5} defaultValue={product.rating} /> 
      </CardContent>
      <CardActions>
        <Button 
        variant="contained"
        className="card-button"
        fullWidth
        startIcon={<AddShoppingCartOutlined/>}
        onClick={handleAddToCart}
        >ADD TO CART</Button>
      </CardActions>
    </Card>
  );  
};

export default ProductCard;

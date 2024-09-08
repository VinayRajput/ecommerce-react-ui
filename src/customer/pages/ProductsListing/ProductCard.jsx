import React, { useState } from 'react'
import { AddShoppingCart, Add, Remove } from '@mui/icons-material'
import { Box, IconButton, Card, CardMedia, CardContent, CardActions, Button, Typography, Chip } from '@mui/material'

const ProductCard = ({ item }) => {
  const { imageUrl, title, description, discountedPrice, price, size } = item
  const [quantity, setQuantity] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')

  const handleIncrease = () => {
    const selectedSizeObj = size.find(s => s.name === selectedSize)
    setQuantity(prev => Math.min(prev + 1, selectedSizeObj ? selectedSizeObj.quantity : 0))
  }

  const handleDecrease = () => {
    setQuantity(prev => Math.max(0, prev - 1))
  }

  const handleAddToCart = () => {
    if (quantity > 0 && selectedSize) {
      console.log(`Added ${quantity} of ${title} (Size: ${selectedSize}) to cart`)
      setQuantity(0)
      setSelectedSize('')
    }
  }

  const handleSizeChange = (sizeName) => {
    setSelectedSize(sizeName === selectedSize ? '' : sizeName)
    setQuantity(0)
  }

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={title}
        sx={{ objectFit: 'cover', maxHeight:'320px', objectPosition:'top' }}
      />
      <CardContent sx={{ flexGrow: 1, p: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="caption" sx={{ mb: 0.5, maxHeight: '40px', overflow: 'hidden', display: 'block' }}>
          {description}
        </Typography>
        <Typography variant="body2" color="primary" sx={{ mb: 0.5 }}>
          ₹{discountedPrice} <span style={{ textDecoration: 'line-through', color: 'grey', fontSize: '0.8em' }}>₹{price}</span>
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 0.5 }}>
          {size.map(({ name }) => (
            <Chip
              key={name}
              label={name}
              onClick={() => handleSizeChange(name)}
              color={selectedSize === name ? "primary" : "default"}
              size="small"
              variant={selectedSize === name ? "filled" : "outlined"}
            />
          ))}
        </Box>
      </CardContent>
      <CardActions sx={{ p: 1, pt: 0 }}>
        <Box display='flex' justifyContent='space-between' alignItems='center' width="100%">
          <Box display='flex' alignItems='center'>
            <IconButton onClick={handleDecrease} size="small" disabled={!selectedSize}>
              <Remove fontSize="small" />
            </IconButton>
            <Typography variant="body2" mx={0.5}>{quantity}</Typography>
            <IconButton onClick={handleIncrease} size="small" disabled={!selectedSize}>
              <Add fontSize="small" />
            </IconButton>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddShoppingCart />}
            onClick={handleAddToCart}
            disabled={quantity === 0 || !selectedSize}
            size="small"
          >
            Add
          </Button>
        </Box>
      </CardActions>
    </Card>
  )
}

export default ProductCard
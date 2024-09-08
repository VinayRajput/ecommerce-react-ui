import React, { useState, useEffect, useRef, useMemo } from 'react'
import ProductCard from './ProductCard'
import { useFetchData } from '../../services/dataFetchService'
import { 
  Container, Breadcrumbs, Link, Typography, 
  FormControl, InputLabel, Select, MenuItem, TextField,
  Slider, Box, Chip, Popover, Button
} from '@mui/material'
import { FilterList, Search } from '@mui/icons-material'

const ProductsListing = () => {
  const {items: allItems, loading} = useFetchData('/mens/shirt')
  const [filteredItems, setFilteredItems] = useState([])
  const [sortBy, setSortBy] = useState('default')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [anchorEl, setAnchorEl] = useState(null)
  const [visibleBrands, setVisibleBrands] = useState([])
  const filterBarRef = useRef(null)
  const open = Boolean(anchorEl)

  const brands = useMemo(()=>[...new Set(allItems?.map(item => item.brand) || [])],[allItems])
  const colors = [...new Set(allItems?.map(item => item.color) || [])]

  useEffect(() => {
    if (!loading && allItems) {
      let result = [...allItems]
      
      if (searchTerm) {
        result = result.filter(item => 
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }
      
      result = result.filter(item => 
        item.discountedPrice >= priceRange[0] && item.discountedPrice <= priceRange[1]
      )
      
      if (selectedBrands.length > 0) {
        result = result.filter(item => selectedBrands.includes(item.brand))
      }

      if (selectedColors.length > 0) {
        result = result.filter(item => selectedColors.includes(item.color))
      }
      
      if (sortBy === 'priceLowToHigh') {
        result.sort((a, b) => a.discountedPrice - b.discountedPrice)
      } else if (sortBy === 'priceHighToLow') {
        result.sort((a, b) => b.discountedPrice - a.discountedPrice)
      }
      
      setFilteredItems(result)
    }
  }, [allItems, loading, sortBy, priceRange, searchTerm, selectedBrands, selectedColors])

useEffect(() => {
    if (filterBarRef.current) {
      const filterBarWidth = filterBarRef.current.offsetWidth
      let totalWidth = 0
      const visibleBrands = []
      
      brands.some(brand => {
        // Estimate chip width (adjust as needed)
        const chipWidth = brand.length * 8 + 32
        if (totalWidth + chipWidth > filterBarWidth - 100) { // Leave space for "More" button
          return true
        }
        totalWidth += chipWidth
        visibleBrands.push(brand)
        return false
      })
      
      setVisibleBrands(visibleBrands)
    }
  },[allItems, filterBarRef, brands])


  const handleSortChange = (event) => {
    setSortBy(event.target.value)
  }

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    )
  }

  const handleColorToggle = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    )
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }


  return (
    <Container maxWidth="lg">
      <Breadcrumbs aria-label="breadcrumb" sx={{ my: 2 }}>
        <Link href="/" color="inherit">Home</Link>
        <Typography color="text.primary">Men's Shirts</Typography>
      </Breadcrumbs>

      <Box ref={filterBarRef} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mb: 2, gap: 2 }}>
        <TextField
          size="small"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <Search />,
          }}
          sx={{ width: 150, '& .MuiInputBase-root': { fontSize: '0.875rem' } }}
        />
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, flexGrow: 1 }}>
          {visibleBrands.map(brand => (
            <Chip
              key={brand}
              label={brand}
              onClick={() => handleBrandToggle(brand)}
              color={selectedBrands.includes(brand) ? "primary" : "default"}
              size="small"
            />
          ))}
        </Box>
        
        <Button 
          variant="outlined" 
          onClick={handleClick} 
          startIcon={<FilterList />}
          size="small"
          sx={{ fontSize: '0.875rem' }}
        >
          More
        </Button>
        
        <FormControl size="small" sx={{ width: 120 }}>
          <InputLabel id="sort-select-label" sx={{ fontSize: '0.875rem' }}>Sort By</InputLabel>
          <Select
            labelId="sort-select-label"
            value={sortBy}
            label="Sort By"
            onChange={handleSortChange}
            sx={{ fontSize: '0.875rem' }}
          >
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
            <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Popover
        id={open ? 'simple-popover' : undefined}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2, width: 300 }}>
          <Typography gutterBottom>Price Range</Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
            sx={{ width: '100%' }}
          />
          <Typography gutterBottom sx={{ mt: 2 }}>Brands</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {brands.map(brand => (
              <Chip
                key={brand}
                label={brand}
                onClick={() => handleBrandToggle(brand)}
                color={selectedBrands.includes(brand) ? "primary" : "default"}
                size="small"
              />
            ))}
          </Box>
          <Typography gutterBottom sx={{ mt: 2 }}>Colors</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {colors.map(color => (
              <Chip
                key={color}
                label={color}
                onClick={() => handleColorToggle(color)}
                color={selectedColors.includes(color) ? "primary" : "default"}
                size="small"
              />
            ))}
          </Box>
        </Box>
      </Popover>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          {filteredItems.length} Products
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
        {!loading && filteredItems.map((item) => (
          <ProductCard key={item.id} item={item}/>
        ))}
      </Box>
    </Container>
  )
}

export default ProductsListing
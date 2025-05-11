<template>
  <CBox
    p={6}
    bg="white"
    borderRadius="lg"
    boxShadow="sm"
    class="stat-card"
  >
    <CFlex align="center" justify="space-between">
      <CVStack align="start" spacing={1}>
        <CText color="gray.600" fontSize="sm">{{ title }}</CText>
        <CHeading size="lg">{{ value }}</CHeading>
      </CVStack>
      <CBox
        p={3}
        bg={`${colorScheme}.50`}
        color={`${colorScheme}.500`}
        borderRadius="full"
      >
        <CIcon :name="icon" boxSize={6} />
      </CBox>
    </CFlex>
  </CBox>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [Number, String],
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  colorScheme: {
    type: String,
    default: 'blue'
  }
})
</script> 
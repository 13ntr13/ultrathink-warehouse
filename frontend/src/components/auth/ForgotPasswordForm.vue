<template>
  <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
    <VStack spacing={4} align="flex-start" w="full">
      <VStack spacing={1} :align="['center', 'center', 'flex-start']" w="full">
        <Heading>Восстановление пароля</Heading>
        <Text>Введите email для восстановления доступа</Text>
      </VStack>

      <FormControl isInvalid="!!errors.email">
        <FormLabel>Email</FormLabel>
        <Input
          v-model="form.email"
          type="email"
          placeholder="Введите ваш email"
          @keyup.enter="handleSubmit"
        />
        <FormErrorMessage>{{ errors.email }}</FormErrorMessage>
      </FormControl>

      <Button
        rounded="md"
        colorScheme="blue"
        w="full"
        :isLoading="isLoading"
        @click="handleSubmit"
      >
        Отправить инструкции
      </Button>

      <HStack justify="space-between" w="full">
        <Button variant="link" @click="$emit('back-to-login')">
          Вернуться к входу
        </Button>
      </HStack>
    </VStack>
  </Box>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useToast } from '@chakra-ui/vue'
import axios from 'axios'

const emit = defineEmits(['back-to-login', 'reset-sent'])
const toast = useToast()

const form = reactive({
  email: ''
})

const errors = reactive({
  email: ''
})

const isLoading = ref(false)

const validateForm = () => {
  let isValid = true
  errors.email = ''

  if (!form.email) {
    errors.email = 'Email обязателен'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Введите корректный email'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isLoading.value = true
  try {
    await axios.post('/api/v1/auth/password-reset', {
      email: form.email
    })
    
    emit('reset-sent')
    toast({
      title: 'Инструкции отправлены',
      description: 'Проверьте ваш email для восстановления пароля',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  } catch (error) {
    toast({
      title: 'Ошибка',
      description: error.response?.data?.detail || 'Не удалось отправить инструкции',
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  } finally {
    isLoading.value = false
  }
}
</script> 
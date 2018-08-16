<template>

  <UserInfo :user="userId"/>

</template>

<script>
import UserInfo from "@/components/UserInfo.vue";

export default {
  name: "User",
  components: {
    UserInfo
  },
  props: {
    userId: {
      type: String,
      required: true
    }
  }
};
</script>

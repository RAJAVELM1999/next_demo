<template>
  <div class="justify-content-center p-5" style="background-color: #eee">
    <!-- <Tutorial /> -->

    <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
      <h2 class="d-flex justify-content-center">Forum For Dev Community</h2>
      <div
        href="/"
        class="
          d-flex
          align-items-center
          flex-shrink-0
          p-3
          link-dark
          text-decoration-none
          border-bottom
        "
      >
        <input
          class="fs-5 fw-semibold"
          v-model="username"
          placeholder="Username"
        />
      </div>
      <div class="list-group list-group-flush border-bottom scrollarea">
        <div
          class="list-group-item list-group-item-action py-3 lh-tight"
          v-for="message in messages"
          :key="message"
        >
          <div class="d-flex w-100 align-items-center justify-content-between">
            <strong class="mb-1">{{ message.username }}</strong>
            <small class="text-muted">Tues</small>
          </div>
          <div class="col-10 mb-1 small">
            {{ message.message }}
          </div>
        </div>
      </div>
      <form @submit.prevent="submit">
        <div class="input-group">
          <input
            class="form-control"
            placeholder="write your message here"
            v-model="message"
            appdend-icon="mdi-send"
          />
          <div class="input-group-btn">
            <button class="btn btn-default" type="submit">
              <i class="glyphicon glyphicon-send"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Pusher from "pusher-js";
import axios from "axios";

export default {
  head() {
    return {
      script: [
        {
          src: "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js",
          src: "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
        },
      ],
    };
  },
  data() {
    return {
      username: "",
      message: "",
      messages: [],
    };
  },
  mounted() {
    Pusher.logToConsole = true;

    const pusher = new Pusher("41ecc8d2b3063b40aa74", {
      cluster: "ap2",
    });
    const channel = pusher.subscribe("serverside");
    channel.bind("message", (data) => {
      this.messages.push(data);
    });
  },
  methods: {
    async submit() {
      await axios.post("http://localhost:8000/api/messages", {
        username: this.username,
        message: this.message,
      });
      this.message = "";
    },
  },
};
</script>

<style>
.scrollarea {
  min-height: 500px;
}
</style>
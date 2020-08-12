<template>
  <section class="page-container back-blur how">
    <div class="how__circle">
      <h1>{{ $t('how.contacts.header') }}</h1>
      <p>
        E-mail:
        <a class="contact-link codetext" href="mailto:vk.mail.twitter@gmail.com ">vk.mail.twitter@gmail.com</a>
        <br>
        Telegram:
        <a class="contact-link codetext" href="https://teleg.run/mashiachy_2" target="_blank">@mashiachy_2</a>
        <br>
        Github:
        <a class="contact-link codetext" href="https://github.com/mashiachy" target="_blank">mashiachy</a>
      </p>
      <p v-html="$t('how.contacts.text')"></p>
    </div>
    <div class="how__form-wrapper">
      <h1 class="how__form-header">{{ $t('how.form.header') }}</h1>
      <form class="how__form">
        <input-field
          name="nameInput"
          v-model="name"
          type="text"
          required
          :valid="isNameValid"
          :placeholder="$t('how.form.name.placeholder')"
        ></input-field>
        <input-field
          class="how__textarea"
          name="articleInput"
          v-model="article"
          type="textarea"
          required
          :valid="isArticleValid"
          :placeholder="$t('how.form.article.placeholder')"
        ></input-field>
        <div class="how__button-line">
          <label for="fileInput">
            <default-button
              class="how__button"
              @click.native.prevent="$refs.fileInput.click()"
            >
              {{ $t('how.form.file.label') }}
            </default-button>
            <input
              class="how__file-input"
              type="file"
              id="fileInput"
              ref="fileInput"
              multiple="false"
              @change="onChange"
            >
          </label>
          <default-button
            white
            class="how__button"
            @click.native.prevent="onSubmit"
          >
            {{ $t('how.form.submit.label') }}
          </default-button>
        </div>
        <message
          class="how__file-message"
          @click.native="file = null"
          v-show="file"
          type="info"
        >
          {{ file ? file.name : '' | fileNameLength($t('how.messages.fileSelected'), 10) }}
        </message>
        <message
          v-show="messageText"
          :type="messageType"
        >
          {{ messageText }}
        </message>
        <message
          v-show="messageFileUploadText"
          :type="messageFileUploadType"
        >
          {{ messageFileUploadText }}
        </message>
      </form>
    </div>
  </section>
</template>

<script>
  export default {
    head () {
      return {
        title: `Mashiachy | ${this.$i18n.locale === 'ru' ? 'Как' : 'How'}`,
      };
    },
    layout: 'default',
    name: 'howPage',
    data () {
      return {
        name: null,
        article: null,
        file: null,
        messageText: null,
        messageType: null,
        messageFileUploadText: null,
        messageFileUploadType: null,
        sentCommentResult: null,
        sentFileResult: null,
      };
    },
    computed: {
      isNameValid () {
        return this.name === null ? 'null' : this.name !== '' ? 'true': 'false';
      },
      isArticleValid () {
        return this.article === null ? 'null' : this.article !== '' ? 'true': 'false';
      },
    },
    watch: {
      sentCommentResult (v) {
        if (v === null) this.messageText = null;
        else if (v === true) {
          this.messageText = this.$t('how.messages.successSubmit');
          this.messageType = 'success';
          this.name = null;
          this.article = null;
        }
        else if (v === false) {
          this.messageText = this.$t('how.messages.errorSubmit');
          this.messageType = 'error';
        }
      },
      sentFileResult (v) {
        if (v === null) this.messageFileUploadText = null;
        else if (v === true) {
          this.messageFileUploadText = this.$t('how.messages.successFileSubmit');
          this.messageFileUploadType = 'success';
          this.file = null;
        }
        else if (v === false) {
          this.messageFileUploadText = this.$t('how.messages.errorFileSubmit');
          this.messageFileUploadType = 'error';
        }
      },
    },
    methods: {
      onSubmit () {
        if (this.isNameValid === 'true' && this.isArticleValid === 'true') {
          const id = this.$fireDb.ref('/comments/').push().key;
          this.$fireDb.ref(`/comments/${id}`).set({
            file: this.file ? this.file.name : null,
            name: this.name,
            text: this.article,
          }, error => {
            if (error) {
              this.sentCommentResult = false;
              setTimeout(() => {
                this.sentCommentResult = null;
              }, 3000);
            } else {
              this.sentCommentResult = true;
              setTimeout(() => {
                this.sentCommentResult = null;
              }, 3000);
            }
          });
          if (this.file) {
            const storage = this.$fireStorage.ref(`/commentFiles/${id}/${this.file.name}`);
            const upload = storage.put(this.file);
            upload.on(
              "state_changed",
              null,
              () => {
                this.sentFileResult = false;
                setTimeout(() => {
                  this.sentFileResult = null;
                }, 3000);
              },
              () => {
                this.sentFileResult = true;
                setTimeout(() => {
                  this.sentFileResult = null;
                }, 3000);
              }
            );
          }
        } else {
          this.messageText = this.$t('how.messages.emptyFields');
          this.messageType = 'info';
          setTimeout(() => {
            this.messageText = null;
          }, 3000);
        }
      },
      onChange ({target}) {
        if (target.files.length) {
          this.file = target.files[0];
        }
      },
    },
    filters: {
      fileNameLength (val, prefix, len) {
        if (val.length <= len) return `${prefix} ${val}`;
        const re = /\.[^/.]+$/;
        const ext = val.search(re) ? val.match(re) : '';
        return `${prefix} ${val.slice(0, len - ext.length - 2)}..${ext}`;
      },
    },
  };
</script>

<style lang="sass">
.contact-link
  opacity: 0.8
  text-decoration: underline

.page-container
  &.how
    border-radius: calc(50vh - 100px)
  .how
    &__circle, &__form-wrapper
      position: absolute
      top: 0
      height: 100%
      box-sizing: border-box
      padding-top: calc(20vh - 25px)
      & > *
        text-align: center
        margin-left: auto
        margin-right: auto
      & > h1
        margin-bottom: 9.2%
    &__circle
      left: 0
      background-color: $black
      width: calc(100vh - 200px)
      border-radius: 50%
      & > p:not(:last-child)
        margin-bottom: 16.4%
    &__form-wrapper
      left: calc(100vw - 200px - 100vh + 100px)
      width: calc(100vh - 200px)
    &__form
      width: 350px
      & > *
        width: 100%
      & > label
        visible: none
      & > *:not(:last-child)
        margin-bottom: 16px
    &__textarea
      height: 128px
    &__button
      &-line
        display: flex
      &:not(:last-child)
        width: 125px
        margin-right: 16px
      &:last-child
        flex-grow: 1
    &__file-input
      position: absolute
      width: 0
      height: 0
      opacity: 0
    &__file-message
      cursor: pointer
      &:hover
        text-decoration: line-through
</style>

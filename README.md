## The Future Is Work

_[The Future is Work](http://thefutureiswork.com) is an open source journal dedicated to publishing and sharing writing on how work is changing_

### Why We Exist

After spending time using and working for "Future of Work" companies, we realized that there's few unbiased resources describing how work is changing, with ground-level access to the show. 

### Contributing

There are a lot of ways to contribute to this project.  Here are a few ways to get started:

1. **Submit a pull request from an approved proposal.** This means, adding the image, and the Markdown file to create the post, as well as writing a little something about it. Not too much (we're not really that wordy)... Kapow, done!
2. **Submit an awesome website!** This involves opening an issue with `[proposal]` as the first word. And a link to something you think is creative and awesome.
3. **Fix a spelling mistake!** I'm not perfect at all, I must make 100 of these a day. Even if it's a small pull request, we'd love to see it!
4. **Mark a post's site as broken.** If you find a post for a site that's no longer working, mark it as down in its front matter

#### Running locally

Start by making sure you have Ruby installed:

```
ruby -v
```

If nothing appears as a result, [install Ruby](https://www.ruby-lang.org/en/documentation/installation).

Then install [Bundler](http://gembundler.com), if you don't already have it:

```
gem install bundler
```

Now, if you're going to be making changes to this site you'll want to make a fork of the repository. This makes it easier for you to make changes and get them reviewed before they're added to the live site.

Once you've forked the repository you'll want to access that code on your own computer.
To do this just clone the repository down to your local machine:

```
git clone https://github.com/username/thefutureiswork.git
```

(Make sure to replace `username` with your username.)

Then you need to navigate into your newly cloned repository:

```
cd thefutureiswork
```

The last thing you need to do before you can run locally is do a `bundle install` to install the required gems.

Then just run `jekyll serve` or `bundle exec jekyll serve` to see the website running on `http://localhost:4000`.

If you get any errors or warnings, try running `bundle exec jekyll serve` instead.

### Keep Checking Back

This is a new project - stay tuned for writing soon!

### License

See the [license](LICENSE.md) file for license rights and limitations (MIT).

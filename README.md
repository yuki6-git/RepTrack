# RepTrack

RepTrack は、筋トレメニュー・トレーニング実績・体重記録・分析をまとめて管理できるトレーニング記録アプリです。

React / TypeScript / Supabase を使ったポートフォリオアプリとして制作しています。

## 概要

筋トレを継続したりモチベーションの向上に重要となる「トレーニングメニュー管理」「実施記録」「体重管理」「成長の可視化」を一つのアプリで扱えるようにしました。

ユーザーはトレーニングメニューを作成し、実施時にはタイマーで開始・終了時間を記録できます。記録されたデータは Dashboard や Analytics で確認できるようにすることでユーザーがどのようなトレーニングを行い、以前と比べどのくらい成長したのかをグラフなどを用いてわかりやすく分析できるようにしました。

## 主な機能

- Supabase Auth を使った新規登録・ログイン
- 初回登録時のプロフィール・目標設定
- トレーニングメニューの作成・編集
- Dayごとのトレーニングタブ管理
- 部位ごとの種目追加
- トレーニングタイマー
- Workout 実施記録の保存
- カレンダーでのトレーニング履歴確認
- 体重・体脂肪率の記録
- 体重推移グラフ
- Dashboard での進捗確認
- Analytics でのトレーニング回数・時間・総重量・PR分析
- ルーティング分割による初期読み込みの軽量化
- Recharts / Chakra UI などの chunk 分割

## 使用技術

- React
- TypeScript
- Vite
- Chakra UI
- Supabase
- Recharts
- React Router

## セットアップ

### 1. 依存関係をインストール

```bash
npm install
```

### 2. 環境変数を設定

プロジェクトルートに `.env` を作成します。

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. 開発サーバーを起動

```bash
npm run dev
```

### 4. ビルド

```bash
npm run build
```

## ページ構成

### Dashboard

ユーザーの現在の進捗を確認するページです。

- 今週のトレーニング回数
- 今日のおすすめトレーニングメニュー
- 最新体重
- 最新PR

### Workout

トレーニング履歴を確認するページです。

- カレンダー表示
- 今週・今月のトレーニング回数
- Workout詳細モーダル
- 実施日・開始時間・終了時間・継続時間の確認

### Training

トレーニングメニューを作成・編集するページです。

- Dayごとのメニュー管理
- 部位選択
- 種目追加
- 種目の編集・削除
- Supabaseへの保存

### Weight

体重・体脂肪率を記録するページです。

- 最新記録
- 目標体重との差分
- 体重推移グラフ
- 直近の体重記録一覧

### Analytics

トレーニング実績を分析するページです。

- 今週のトレーニング目標進捗
- トレーニング時間グラフ
- 種目別PRランキング
- 部位別総重量グラフ
- 詳細モーダルでの追加分析

### Profile Setting

プロフィールや目標を編集するページです。

- ユーザー情報
- 身長・体重などの身体情報
- 目標タイプ
- 活動量
- 週間目標回数
- 目標カロリー

## Supabase テーブル

主に以下のテーブルを使用しています。

- `users`
- `profile_setting`
- `goals`
- `training_menu`
- `training_menu_exercises`
- `workouts`
- `exercise_records`
- `weight_records`

## ディレクトリ構成

```txt
src/
  api/          Supabaseとの通信処理
  components/   UIコンポーネント
  context/      React Context
  features/     機能単位の処理
  hooks/        カスタムフック
  layouts/      汎用レイアウト
  pages/        各ページ
  routes/       ルーティング
  types/        型定義
  utils/        汎用関数
```

## パフォーマンス対応

初期読み込みを軽くするため、以下の対応を行っています。

- `React.lazy` によるページ単位の遅延読み込み
- Recharts を `charts` chunk に分割
- Chakra UI 関連を `chakra` chunk に分割
- React 関連ライブラリを別 chunk に分割

## デモデータ

デモ表示用には、以下のようなデータを用意すると各ページの見栄えが良くなります。

- デモユーザー 1件
- トレーニングメニュー 3〜4件
- Workout記録 8〜12件
- 種目記録 10〜20件
- 体重記録 7〜14件

Dashboard / Workout / Weight / Analytics の表示確認に使えます。

## スクリーンショット

デモデータを用意した後、以下の画面キャプチャを追加予定です。

- Dashboard
- Training メニュー作成
- Workout カレンダー
- Weight 体重推移
- Analytics

## 現在の実装状況

MVPとして必要な主要機能は一通り実装済みです。

実装済み:

- 認証機能
- 初回登録フロー
- プロフィール編集
- トレーニングメニューCRUD
- Workout記録
- 体重記録
- Dashboard
- Analytics
- ルーティング分割
- 基本的なレンダリング最適化


